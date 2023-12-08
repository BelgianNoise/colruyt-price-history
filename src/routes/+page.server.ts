import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PriceChange, PriceChangeGCSDOCDORMAT } from '$lib/models/price-change';
import type { PP, PPGCSDOCDORMAT } from '$lib/models/pp';

export interface RootLoadResults {
  pp: PP[];
  ss: PriceChange[];
  dd: PriceChange[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>, '/search/[query]'>,
): Promise<RootLoadResults> {
  let pp: PP[] = [];
  try { pp = await getPP() } catch (e) {
    console.error('An error occured', e);
  }
  let ss: PriceChange[] = [];
  try { ss = await getSS() } catch (e) {
    console.error('An error occured', e);
  }
  let dd: PriceChange[] = [];
  try { dd = await getDD() } catch (e) {
    console.error('An error occured', e);
  }

  return { pp, ss, dd };
}

async function getPP(): Promise<PP[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('prettige-prijzen/pp-short.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PPGCSDOCDORMAT = JSON.parse(fileString);
    if (fileJson.date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.pps;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}

async function getSS(): Promise<PriceChange[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('sterkste-stijgers/ss-short.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCDORMAT = JSON.parse(fileString);
    if (fileJson.date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.priceChanges;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}

async function getDD(): Promise<PriceChange[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('drastische-dalers/dd-short.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCDORMAT = JSON.parse(fileString);
    if (fileJson.date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.priceChanges;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}
