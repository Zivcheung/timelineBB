import Showdown from "showdown";

let converter = new Showdown.Converter({
  simpleLineBreaks:true,
});

export default converter;