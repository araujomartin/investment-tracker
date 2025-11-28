import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, sheets_v4 } from 'googleapis';
import { MarketData } from '../../domain/entities/market-data.entity';
import type { TickerSlug } from '../../../assets/domain/repositories/ticker.model';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

@Injectable()
export class GoogleSheetMarketDataService {
  private sheetsClient: sheets_v4.Sheets;

  constructor(private configService: ConfigService) {
    const keyFilePath = this.configService.get<string>(
      'GOOGLE_SHEET_KEYFILE',
      'config/credentials.json'
    );
    
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: SCOPES,
    });

    
    this.sheetsClient = google.sheets({ version: 'v4', auth });
  }

  async fetchPrice(ticker: TickerSlug): Promise<MarketData | null> {
    const spreadsheetId = this.configService.get<string>('GOOGLE_SHEET_ID', '');
    const range = this.configService.get<string>('GOOGLE_SHEET_RANGE', 'Prices!A1:B100');

    console.log(`Fetching price for ticker: ${ticker} from Google Sheets`);

    try {
      const res = await this.sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      console.log(`Received response from Google Sheets for ticker: ${res}`);

      const values = res.data.values ?? [];
      const row = values.find(
        (r: unknown[]) =>
          typeof r[0] === 'string' &&
          r[0].toUpperCase() === ticker.toUpperCase(),
      );

      console.log(`Looking up price for ticker: ${ticker}`);
      if (!row || row.length < 2 || typeof row[1] !== 'string') return null;

      const priceStr = row[1].replace(',', '.');
      const price = Number(priceStr);

      console.log(`Fetched price for ${ticker}: ${price}`);
      if (isNaN(price)) return null;

      return new MarketData({
        ticker,
        priceInUsd: price,
        closePriceInUsd: price,
        lastUpdatedDate: new Date(),
        marketStatus: 'OPEN',
      });
    } catch (error) {
      console.error(`Error fetching price for ticker: ${ticker}`, error);
      return null;
    }
  }
}
