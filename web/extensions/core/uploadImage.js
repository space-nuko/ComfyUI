import { app } from "/scripts/app.js";

// Adds an upload button to the nodes

app.registerExtension({
	name: "Comfy.UploadImage",
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
		switch (nodeData.name) {
		case "LoadImageMask":
			nodeData.input.required.upload = ["IMAGEUPLOAD"];
			break;
		}
	},
});
