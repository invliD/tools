import * as React from "react";

import { Button, Classes, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";

import { ISubnet, numToIp, SUBNETS } from "./subnets";

import "./SubnetSelect.scss";

export interface ISubnetSelectProps {
	id?: string;
	type: keyof typeof VISUALS;
	value: ISubnet;
	onChange(subnet: ISubnet): void;
}

interface ISubnetSelectState {
	activeItem: ISubnet;
	query: string;
}

interface IVisual {
	predicate(query: string, subnet: ISubnet): boolean;
	render(subnet: ISubnet): React.ReactChild;
}

// tslint:disable:no-object-literal-type-assertion
const VISUALS = {
	bits: {
		predicate: (query, subnet) => subnet.bits === parseInt(query, 10),
		render: subnet => subnet.bits,
	} as IVisual,
	netmask: {
		predicate: (query, subnet) => numToIp(subnet.netmask).startsWith(query),
		render: subnet => numToIp(subnet.netmask),
	} as IVisual,
	numberOfAddresses: {
		predicate: (query, subnet) => subnet.numberOfAddresses === parseInt(query, 10),
		render: subnet => subnet.numberOfAddresses,
	} as IVisual,
	numberOfSubnets: {
		predicate: (query, subnet) => subnet.numberOfSubnets === parseInt(query, 10),
		render: subnet => subnet.numberOfSubnets,
	} as IVisual,
};
// tslint:enable:no-object-literal-type-assertion

export class SubnetSelect extends React.PureComponent<ISubnetSelectProps, ISubnetSelectState> {
	public state: ISubnetSelectState = {
		activeItem: this.props.value,
		query: "",
	};

	private get visual(): IVisual {
		return VISUALS[this.props.type];
	}

	public componentWillReceiveProps(nextProps: ISubnetSelectProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({ activeItem: nextProps.value });
		}
	}

	public render() {
		return (
			<Select<ISubnet>
				activeItem={this.state.activeItem}
				itemPredicate={this.filter}
				itemRenderer={this.renderItem}
				items={SUBNETS}
				noResults={<MenuItem className={Classes.TEXT_MUTED} disabled={true} text="No results." />}
				onActiveItemChange={this.handleActiveItemChange}
				onItemSelect={this.props.onChange}
				onQueryChange={this.handleChangeQuery}
				popoverProps={{
					minimal: true,
					onOpening: this.handlePopoverOpening,
					targetTagName: "div",
					wrapperTagName: "div",
				}}
				query={this.state.query}
				resetOnQuery={false}
			>
				<Button
					className="ipc-subnet-select"
					fill={true}
					id={this.props.id}
					rightIcon="caret-down"
					text={this.visual.render(this.props.value)}
				/>
			</Select>
		);
	}

	private renderItem: ItemRenderer<ISubnet> = (item, props) => {
		if (!props.modifiers.matchesPredicate) {
			return null;
		}
		return (
			<MenuItem
				active={props.modifiers.active}
				disabled={props.modifiers.disabled}
				key={item.bits}
				onClick={props.handleClick}
				text={this.visual.render(item)}
			/>
		);
	};

	private filter = (query: string, item: ISubnet) => {
		return query.length === 0 || this.visual.predicate(query, item);
	};

	private handleActiveItemChange = (activeItem: ISubnet | null) => {
		if (activeItem != null) {
			this.setState({ activeItem });
		}
	};

	private handleChangeQuery = (query: string) => {
		this.setState({ query });
	};

	private handlePopoverOpening = () => {
		this.setState({ query: "" });
	};
}
