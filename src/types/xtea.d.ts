declare module "xtea" {
	import { Buffer } from 'buffer/';
	type xtea_mode = "ecb" | "cbc";

	interface xtea {
		encrypt: (msg: Buffer, key: Buffer, mode?: xtea_mode, iv?: Buffer, skippad?: boolean) => Buffer,
		decrypt: (msg: Buffer, key: Buffer, mode?: xtea_mode, ivbuf?: Buffer, skippad?: boolean) => Buffer,
		encryptBlock: (block: Buffer, key: Buffer) => Buffer,
		decryptBlock: (block: Buffer, key: Buffer) => Buffer,
	}

	var _xtea: xtea;
	export = _xtea;
}
