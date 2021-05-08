const SHAPE_NAME_RECTANGLE = "rect"

export function getBasename(path) {
    return path.split('/').reverse()[0]
}

export function getExtension(path) {
    const extIndex = path.lastIndexOf('.')
    if (extIndex === -1) {
        return ''
    }
    return path.substr(extIndex + 1, path.length)
}

export function toViaAggData(aggData) {
    return Object.fromEntries(new Map(Object.entries(aggData).map(([imageKey, imageData]) => 
        [imageKey, toViaImageData(imageData)]
    )))
}

// Fix the key in via format is the concatenation of the filename and filesize
// e.g., "HL20100702_01_Gg_990702 (99).JPG3605023": {
//          "filename": "HL20100702_01_Gg_990702 (99).JPG",
//          "size": 3605023,
export function fromViaAggData(aggData) {
    return Object.fromEntries(new Map(Object.entries(aggData).map(([imageKey, imageData]) => 
        [imageData.filename, fromViaImageData(imageData)]
    )))    
}

export function toViaImageData(imageData) {
    const width = imageData.data.meta.width
    const height = imageData.data.meta.height
    const size = width * height
    const filename = "path" in imageData.data ? getBasename(imageData.data.path) : ""
    const regions = Object.fromEntries(new Map(
        imageData.regions.map(function(region, index, array) {
            const new_region = toViaRegion(
                region,
                width,
                height,
            )
            return [index, new_region]
        })
    ))
    return {
        "fileref": "",
        "size": size,
        "filename": filename,
        "base64_img_data": "",
        "file_attributes": {
            "width": width,
            "height": height,
            "path": imageData.data.path,
        },
        "regions": regions,
    }    
}

export function fromViaImageData(imageData) { 
    const regions = Object.entries(imageData.regions).map(([index, region]) => fromViaRegion(region, index))
    var outImageData = {
        "data": {
            "meta": {},
        },
        "regions": regions,
    }
    if ("width" in imageData.file_attributes) {
        outImageData.data.meta["width"] = imageData.file_attributes.width
    }
    if ("height" in imageData.file_attributes) {
        outImageData.data.meta["height"] = imageData.file_attributes.height
    }
    if ("path" in imageData.file_attributes) {
        outImageData.data["path"] = imageData.file_attributes.path 
    }
    return outImageData
}

export function toViaRegion(region, image_width, image_height) {
    const x = Math.ceil(image_width * region.x / 100.0)
    const y = Math.ceil(image_height * region.y / 100.0)
    const width = Math.ceil(image_width * region.width / 100.0)
    const height = Math.ceil(image_height * region.height / 100.0)
    var outRegion = {
        "shape_attributes": {
            "name": SHAPE_NAME_RECTANGLE,
            "x": x,
            "y": y,
            "width": width,
            "height": height,
        },
        "region_attributes": {},
    }
    if (("data" in region) && ("groupId" in region.data)) {
        outRegion.region_attributes["GROUP_ID"] = region.data.groupId
    } 
    if (("data" in region) && ("kuId" in region.data)) {
        outRegion.region_attributes["KU_ID"] = region.data.kuId
    }
    return outRegion
}

export function fromViaRegion(region, index) {
    const shapeAttrs = region.shape_attributes 
    var outRegion = {
        "index": index,
        "data": {
            "via": {
                "x": shapeAttrs.x,
                "y": shapeAttrs.y,
                "width": shapeAttrs.width,
                "height": shapeAttrs.height,
            },
        },
        "new": true,        // Keep these two fields temporarily.
        "isChanging": true,
    }
    if (("region_attributes" in region) && ("GROUP_ID" in region.region_attributes)) {
        outRegion.data["groupId"] = region.region_attributes.GROUP_ID
    } 
    if (("region_attributes" in region) && ("KU_ID" in region.region_attributes)) {
        outRegion.data["kuId"] = region.region_attributes.KU_ID
    } 
    return outRegion
}

// {
//     "data": {
//         "meta": {
//             "width": 3888,
//             "height": 2592
//         },
//         "path": "/Users/Alien/workspace/project/private/dolphin-id-backend/data/HL20100702_01_Gg_990702 (98).JPG"
//     },
//     "regions": [
//         {
//             "x": 57.08318905817175,
//             "y": 38.76288659793815,
//             "width": 10,
//             "height": 10,
//             "index": 0,
//             "new": true,
//             "data": {
//                 "groupId": "111"
//             },
//             "isChanging": true
//         },
//         {
//             "x": 27.99731648199446,
//             "y": 48.65979381443299,
//             "width": 10,
//             "height": 10,
//             "index": 1,
//             "new": true,
//             "data": {
//                 "kuId": "44"
//             },
//             "isChanging": true
//         }
//     ]
// }

//     {
//         "fileref": "",
//         "size": data.data.meta.width * data.data.meta.height,
//         "filename": "HL20100702_01_Gg_990702 (26).JPG",
//         "base64_img_data": "",
//         "file_attributes": {},
//         "regions": {
//             "0": {
//                 "shape_attributes": {
//                     "name": "rect",
//                     "x": 1640,
//                     "y": 987,
//                     "width": 476,
//                     "height": 386
//                 },
//                 "region_attributes": {
//                     "GROUP_ID": "03",
//                     "KU_ID": "014"
//                 }
//             },
//             "1": {
//                 "shape_attributes": {
//                     "name": "rect",
//                     "x": 3081,
//                     "y": 217,
//                     "width": 285,
//                     "height": 245
//                 },
//                 "region_attributes": {
//                     "GROUP_ID": "07",
//                     "KU_ID": "021"
//                 }
//             }
//         }
//     }
// }