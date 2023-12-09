import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PriceChange, PriceChangeGCSDOCFORMAT } from '$lib/models/price-change';

export interface DDLoadResults {
  dd: PriceChange[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>>,
): Promise<DDLoadResults> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('drastische-dalers/dd.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return { dd: [] };
    }
    return { dd: fileJson.data };
  } catch (e) {
    console.error('An error occured', e);
    return { dd: [] };
  }
}
