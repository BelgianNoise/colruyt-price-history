import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PriceChange } from '$lib/models/price-change';

export interface RootLoadResults {
  priceChanges: PriceChange[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>, '/search/[query]'>,
): Promise<RootLoadResults> {

  try {
    const storage = new Storage();
    const [ bucketItems ] = await storage.bucket('colruyt-products').getFiles({ prefix: 'price-changes/' });
    const filesReversed = bucketItems.reverse();
    // check if file is from today or yesterday (to bridge the time it takes to run the workflow)
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const selectedFile = filesReversed.find((file) => {
      const fileDate = new Date(file.metadata.updated);
      if (fileDate.toDateString() === today.toDateString()
        || fileDate.toDateString() === yesterday.toDateString()) {
          return true;
      }
      return false;
    });
    if (!selectedFile) throw new Error('No file found');
    const [ fileContent ] = await selectedFile.download();
    const fileContentString = fileContent.toString();
    const fileContentJson: any[] = JSON.parse(fileContentString);
    const parsedList: PriceChange[] = fileContentJson.map((item) => ({
      ... item,
      thumbnail: item.thumbNail,
      id: item.productId,
    }));
    return { priceChanges: parsedList };

  } catch (e) {
    console.error('An error occured', e);
  }

  return { priceChanges: [] };
}
