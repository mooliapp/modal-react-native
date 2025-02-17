"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SvgCopyLarge = props => /*#__PURE__*/React.createElement(_reactNativeSvg.default, _extends({
  width: 24,
  height: 24,
  fill: "none",
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement(_reactNativeSvg.Path, {
  fill: props.fill || '#fff',
  fillRule: "evenodd",
  d: "M7.01 7.011c.03-1.545.138-2.5.535-3.28A5 5 0 0 1 9.73 1.545C10.8 1 12.2 1 15 1c2.8 0 4.2 0 5.27.545a5 5 0 0 1 2.185 2.186C23 4.8 23 6.2 23 9c0 2.8 0 4.2-.545 5.27a4.999 4.999 0 0 1-2.185 2.184c-.78.398-1.735.506-3.28.535l-.001.01c-.03 1.54-.138 2.492-.534 3.27a5 5 0 0 1-2.185 2.186C13.2 23 11.8 23 9 23c-2.8 0-4.2 0-5.27-.544a5 5 0 0 1-2.185-2.186C1 19.2 1 17.8 1 15c0-2.8 0-4.2.545-5.27A5 5 0 0 1 3.73 7.545c.778-.396 1.73-.504 3.27-.534h.01Zm7.99 8.49c-1.425 0-2.403-.002-3.162-.064-.74-.06-1.139-.171-1.427-.318a3.5 3.5 0 0 1-1.53-1.53c-.146-.288-.257-.686-.318-1.427C8.501 11.404 8.5 10.425 8.5 9c0-1.424.001-2.403.063-3.161.06-.741.172-1.14.318-1.427a3.5 3.5 0 0 1 1.53-1.53c.288-.147.686-.258 1.427-.318.759-.062 1.737-.064 3.162-.064 1.425 0 2.403.002 3.162.064.74.06 1.139.171 1.427.318a3.5 3.5 0 0 1 1.53 1.53c.146.288.257.686.318 1.427.062.758.063 1.737.063 3.161 0 1.425-.001 2.404-.063 3.162-.06.741-.172 1.14-.319 1.427a3.5 3.5 0 0 1-1.529 1.53c-.288.147-.686.258-1.427.318-.759.062-1.737.064-3.162.064ZM7 8.51c-.444.01-.825.025-1.162.053-.74.06-1.139.171-1.427.318a3.5 3.5 0 0 0-1.53 1.53c-.146.287-.257.686-.318 1.427-.062.758-.063 1.736-.063 3.161s.001 2.404.063 3.162c.06.741.172 1.14.318 1.427a3.5 3.5 0 0 0 1.53 1.53c.288.147.686.258 1.427.318.759.062 1.737.063 3.162.063 1.425 0 2.403 0 3.162-.063.74-.06 1.139-.171 1.427-.318a3.5 3.5 0 0 0 1.53-1.53c.146-.288.257-.686.318-1.427.027-.337.043-.718.052-1.162H15c-2.8 0-4.2 0-5.27-.544a5 5 0 0 1-2.185-2.186C7 13.2 7 11.8 7 9v-.488Z",
  clipRule: "evenodd"
}));
var _default = SvgCopyLarge;
exports.default = _default;
//# sourceMappingURL=CopyLarge.js.map