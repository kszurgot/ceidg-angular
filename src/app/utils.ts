export default class Utils {
    static removeEmptyProperties(object: Object) { 
        let propNames = Object.getOwnPropertyNames(object);
        for (var i = 0; i < propNames.length; i++) {
            var propName = propNames[i];
            if (object[propName] === null || object[propName] === undefined || object[propName] === "") {
                delete object[propName];
            }
        }
    }
}
