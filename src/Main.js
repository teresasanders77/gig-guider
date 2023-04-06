import React from "react";

export const Main = () => {
    return (
        <div>
            <h1>Gig Guider</h1>
            <ul className="header">
                <li>
                    <a href="/">Get Started</a>
                </li>
                <li>
                    <a href="/stuff">Form</a>
                </li>
                <li>
                    <a href="/contact">8-ball animation + answers</a>
                </li>
                <li>
                    <a href="/contact">Specifics</a>
                </li>
            </ul>
            <div className="content"></div>
        </div>
    );
};
