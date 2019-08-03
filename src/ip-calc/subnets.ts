export interface ISubnet {
	bits: number;
	netmask: number;
	numberOfAddresses: number;
	numberOfSubnets: number;
}

export const SUBNETS = Array(32)
	.fill(0)
	.map<ISubnet>((_, index) => ({
		bits: index + 1,
		netmask: 0x80000000 >> index,
		numberOfAddresses: Math.pow(2, 31 - index) - (index < 30 ? 2 : 0),
		numberOfSubnets: Math.pow(2, 31 - index),
	}));

export function numToIp(num: number) {
	const d = num & 0xff;
	const c = (num >> 8) & 0xff;
	const b = (num >> 16) & 0xff;
	const a = (num >> 24) & 0xff;
	return `${a}.${b}.${c}.${d}`;
}

export function ipToNum(ip: string) {
	return ip.split(".").reduce((sum, str, index) => sum + (parseInt(str, 10) << (8 * (3 - index))), 0);
}
