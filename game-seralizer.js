const {parse, stringify} = Flatted

function create_json_from_data(){
    var pixelMapClone = pixelMap.map(row => row.slice());

    for (let x = 0; x < 166; x++){
        pixelMapClone[x] = pixelMapClone[x].filter(v => v !== undefined);
        pixelMapClone[x] = pixelMapClone[x].filter(v => v !== null);
    }
    
    return stringify(pixelMapClone);
}

function load_data_from_json(input){
    var raw_parsed = parse(input);
    var pixel_data = [];
    for (let x = 0; x < 166; x++){
        if (raw_parsed[x].length == 0){
            x++;
        } else {
            for (let y = 0; y < raw_parsed[x].length; y++){
                pixel_data.push(raw_parsed[x][y]);
            }
        }
    }
    var new_pixel_map = []
    for (let x = 0; x < 166; x++){
        new_pixel_map.push([])
        for (let y = 0; y < 82; y++){
            new_pixel_map[x].push(undefined)
        }
    }
    var addon_current_pixels = []
    for (let i = 0; i < pixel_data.length; i++){
        var x = pixel_data[i].x;
        var y = pixel_data[i].y;
        var element = pixel_data[i].element;
        var new_pixel = new Pixel(x, y, element);
        delete pixel_data[i].x;
        delete pixel_data[i].y;
        delete pixel_data[i].element;
        var pixel_props = Object.getOwnPropertyNames(pixel_data[i]);
        for (let j = 0; j < pixel_props.length; j++){
            new_pixel[pixel_props[j]] = pixel_data[i][pixel_props[j]];
        }
        new_pixel_map[x][y] = new_pixel;
        addon_current_pixels.push(new_pixel);
    }
    var return_val = [new_pixel_map, addon_current_pixels];
    return return_val;
}