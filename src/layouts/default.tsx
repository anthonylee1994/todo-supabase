import React from "react";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps) {
    return (
        <React.Fragment>
          {children}
        </React.Fragment>
    );
}
