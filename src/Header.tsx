import * as React from "react";

import { Classes, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";

export class Header extends React.PureComponent {
    public render() {
        return (
            <Navbar className={Classes.DARK} fixedToTop={true}>
                <NavbarGroup>
                    <NavbarHeading>Tools</NavbarHeading>
                </NavbarGroup>
            </Navbar>
        );
    }
}
