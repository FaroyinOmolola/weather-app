import React from "react";
import TwinSpin from "react-cssfx-loading/lib/TwinSpin";

export default function Loading() {
	return (
		<div className="loader">
			<TwinSpin color="#AB47BC" width="50px" height="50px" duration="3s" />
		</div>
	);
}
