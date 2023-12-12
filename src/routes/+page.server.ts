import type { ServerLoadEvent } from '@sveltejs/kit';
import { Storage } from '@google-cloud/storage';
import type { PriceChange, PriceChangeGCSDOCFORMAT } from '$lib/models/price-change';
import type { PP, PPGCSDOCFORMAT } from '$lib/models/pp';

export interface RootLoadResults {
  pp: PP[];
  ppNew: PP[];
  ss: PriceChange[];
  dd: PriceChange[];
}

export async function load(
  event: ServerLoadEvent<object, Omit<unknown, never>>,
): Promise<RootLoadResults> {
  let pp: PP[] = [];
  try { pp = await getPP() } catch (e) {
    console.error('An error occured', e);
  }
  let ppNew: PP[] = [];
  try { ppNew = await getPPNew() } catch (e) {
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

  return { pp, ss, dd, ppNew };
}

async function getPP(): Promise<PP[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('prettige-prijzen/pp-mini.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PPGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.data;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}

async function getPPNew(): Promise<PP[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('prettige-prijzen/pp-changes-mini.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PPGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.data;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}

async function getSS(): Promise<PriceChange[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('sterkste-stijgers/ss-mini.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.data;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}

async function getDD(): Promise<PriceChange[]> {
  try {
    const storage = new Storage();
    const bucket = storage.bucket('colruyt-products');
    const file = bucket.file('drastische-dalers/dd-mini.json');
    const [ fileContent ] = await file.download();
    const fileString = fileContent.toString();
    const fileJson: PriceChangeGCSDOCFORMAT = JSON.parse(fileString);
    if (new Date(fileJson.date).getTime() < new Date().getTime() - 24 * 60 * 60 * 1000) {
      return [];
    }
    return fileJson.data;
  } catch (e) {
    console.error('An error occured', e);
    return [];
  }
}
