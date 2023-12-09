import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PriceChange, PriceChangeGCSDOCFORMAT } from '$lib/models/price-change';

export interface SSLoadResults {
  ss: PriceChange[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>>,
): Promise<SSLoadResults> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('sterkste-stijgers/ss.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return { ss: [] };
    }
    return { ss: fileJson.data };
  } catch (e) {
    console.error('An error occured', e);
    return { ss: [] };
  }
}
