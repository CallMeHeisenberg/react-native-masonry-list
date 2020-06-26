import { Image } from "react-native";
import Task from "./task";
import { setItemSource } from "./../utils";

export const resolveImage = (uri, image, data, itemSource) => {
	if (data && itemSource && itemSource.length > 0) {
		if (image.dimensions && image.dimensions.width && image.dimensions.maxHeight) {
			return new Task(
				(reject, resolve) => {
					Image.getSize(uri, (width, height) => {
						image.dimensions = resolveDimensions({width, height});
						const resolvedData = setItemSource(data, itemSource, image);
						resolve({
							...resolvedData,
						});
						// eslint-disable-next-line no-undef
					}, (err) => reject(err));
				}
			);
		}
		return new Task(
			(reject, resolve) => {
				Image.getSize(uri, (width, height) => {
					image.dimensions = { width, height };
					const resolvedData = setItemSource(data, itemSource, image);
					resolve({
						...resolvedData,
					});
					// eslint-disable-next-line no-undef
				}, (err) => reject(err));
			}
		);
	}
	if (image.dimensions && image.dimensions.width && image.dimensions.maxHeight) {
		return new Task((reject, resolve) => Image.getSize(uri, (width, height) => resolve({
			...image,
			dimensions: resolveDimensions({width, height})
			// eslint-disable-next-line no-undef
		}), (err) => reject(err)));
	}

	return new Task((reject, resolve) => Image.getSize(uri, (width, height) => resolve({
		...image,
		dimensions: {
			width,
			height
		}
		// eslint-disable-next-line no-undef
	}), (err) => reject(err)));
};

export const resolveDimensions = (dimensions) => {
	const ratio = dimensions.height / dimensions.width;
	if (ratio > 1) {
		let determinedHeightByRatio = dimensions.width * ratio;
		if (determinedHeightByRatio > dimensions.maxHeight) {
			determinedHeightByRatio = dimensions.maxHeight;
		}
		dimensions = {
			width: dimensions.width,
			height: determinedHeightByRatio
		};
	} else { // 1:1 ratio
		dimensions = {
			width: dimensions.width,
			height: dimensions.width
		};
	}

	return dimensions;
};

export const resolveLocal = (image, data, itemSource) => {
	if (data && itemSource && itemSource.length > 0) {
		if (image.dimensions && image.dimensions.width && image.dimensions.height) {
			const resolvedData = setItemSource(data, itemSource, image);
			return new Task((reject, resolve) => {
				resolve({
					...resolvedData
				});
				// eslint-disable-next-line no-undef
			}, (err) => reject(err));
		}
		if (image.width && image.height) {
			return new Task((reject, resolve) => {
				image.dimensions = { width: image.width, height: image.height };
				const resolvedData = setItemSource(data, itemSource, image);
				resolve({
					...resolvedData
				});
				// eslint-disable-next-line no-undef
			}, (err) => reject(err));
		}
	}
	if (image.dimensions && image.dimensions.width && image.dimensions.height) {
		return new Task((reject, resolve) => {
			resolve({
				...image
			});
			// eslint-disable-next-line no-undef
		}, (err) => reject(err));
	}
	if (image.width && image.height) {
		return new Task((reject, resolve) => {
			resolve({
				...image,
				dimensions: {
					width: image.width,
					height: image.height
				}
			});
			// eslint-disable-next-line no-undef
		}, (err) => reject(err));
	}
};
