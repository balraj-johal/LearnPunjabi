import React from "react";

import Topbar from "./Topbar";

function Dashboard(props) {

    return(
        <div id="main">
            <Topbar />
            <div class="container">
                <h1>
                    Root.
                </h1>
            </div>
        </div>
    )
}

export default Dashboard;