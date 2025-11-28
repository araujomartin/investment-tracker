import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { MarketData } from '../../domain/entities/market-data.entity';
import type { TickerSlug } from 'src/core/assets/domain/repositories/ticker.model';

const KEYFILEPATH =
  process.env.GOOGLE_SHEET_KEYFILE || 'config/credentials.json';
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const RANGE = process.env.GOOGLE_SHEET_RANGE || 'Prices!A1:B100';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

@Injectable()
export class GoogleSheetMarketDataService {
  private sheetsClient: sheets_v4.Sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });
    this.sheetsClient = google.sheets({ version: 'v4', auth });
  }

  async fetchPrice(ticker: TickerSlug): Promise<MarketData | null> {
    try {
      const res = await this.sheetsClient.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
      });

      const values = res.data.values ?? [];
      const row = values.find(
        (r: unknown[]) =>
          typeof r[0] === 'string' &&
          r[0].toUpperCase() === ticker.toUpperCase(),
      );
      if (!row || row.length < 2 || typeof row[1] !== 'string') return null;

      const priceStr = row[1].replace(',', '.');
      const price = Number(priceStr);
      if (isNaN(price)) return null;

      return new MarketData({
        ticker,
        priceInUsd: price,
        closePriceInUsd: price,
        lastUpdatedDate: new Date(),
        marketStatus: 'OPEN',
      });
    } catch {
      return null;
    }
  }
}
