import * as React from "react";

import { FormGroup, InputGroup } from "@blueprintjs/core";

import { ipToNum, ISubnet, numToIp, SUBNETS } from "./subnets";
import { SubnetSelect } from "./SubnetSelect";

import "./IpCalculator.scss";

interface IIpCalculatorState {
	ipAddress: string;
	subnet: ISubnet;
}

export class IpCalculator extends React.PureComponent<{}, IIpCalculatorState> {
	public state: IIpCalculatorState = {
		ipAddress: "10.0.0.1",
		subnet: SUBNETS[23],
	};

	public render() {
		const ipNum = ipToNum(this.state.ipAddress);
		const networkIp = numToIp(ipNum & this.state.subnet.netmask);
		const broadcastIp = numToIp((ipNum & this.state.subnet.netmask) | ~this.state.subnet.netmask);
		return (
			<div className="ipc-container">
				<div className="ipc-row">
					<FormGroup className="ipc-cell" label="IP Address" labelFor="ipc-ipaddress">
						<InputGroup
							id="ipc-ipaddress"
							onChange={this.handleChangeIpAddress}
							value={this.state.ipAddress}
						/>
					</FormGroup>
					<FormGroup className="ipc-cell" label="Netmask" labelFor="ipc-netmask">
						<SubnetSelect
							id="ipc-netmask"
							onChange={this.handleSelectSubnet}
							type="netmask"
							value={this.state.subnet}
						/>
					</FormGroup>
				</div>
				<div className="ipc-row">
					<FormGroup className="ipc-cell" label="Netmask bits" labelFor="ipc-bits">
						<SubnetSelect
							id="ipc-bits"
							onChange={this.handleSelectSubnet}
							type="bits"
							value={this.state.subnet}
						/>
					</FormGroup>
					<FormGroup className="ipc-cell" contentClassName="ipc-text-content" label="Wildcard mask">
						{numToIp(~this.state.subnet.netmask)}
					</FormGroup>
				</div>
				<div className="ipc-row">
					<FormGroup className="ipc-cell" label="Maximum Subnets" labelFor="ipc-subnets">
						<SubnetSelect
							id="ipc-subnets"
							onChange={this.handleSelectSubnet}
							type="numberOfSubnets"
							value={this.state.subnet}
						/>
					</FormGroup>
					<FormGroup className="ipc-cell" label="Maximum Addresses" labelFor="ipc-addresses">
						<SubnetSelect
							id="ipc-addresses"
							onChange={this.handleSelectSubnet}
							type="numberOfAddresses"
							value={this.state.subnet}
						/>
					</FormGroup>
				</div>
				<div className="ipc-row">
					<FormGroup className="ipc-cell" contentClassName="ipc-text-content" label="Network address">
						{networkIp}
					</FormGroup>
					<FormGroup className="ipc-cell" contentClassName="ipc-text-content" label="Network (CIDR)">
						{networkIp}/{this.state.subnet.bits}
					</FormGroup>
				</div>
				<div className="ipc-row">
					<FormGroup className="ipc-cell" contentClassName="ipc-text-content" label="Address Range">
						{networkIp} – {broadcastIp}
					</FormGroup>
				</div>
			</div>
		);
	}

	private handleChangeIpAddress = (event: React.FormEvent<HTMLInputElement>) => {
		this.setState({ ipAddress: event.currentTarget.value });
	};

	private handleSelectSubnet = (subnet: ISubnet) => {
		this.setState({ subnet });
	};
}
