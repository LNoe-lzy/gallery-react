require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// // 获取图片相关的数据
// let imageData = require('../data/imageData.json');
//
// // 利用自执行函数, 将图片名信息转化为url路径信息
// imageData = ((imageDataArr) => {
//   for (let i = 0, j = imageDataArr.length; i < j; i++) {
//     let singleImageData = imageDataArr[i];
//     singleImageData.imageUrl = require('../images/' + singleImageData.filename);
//     imageDataArr[i] = singleImageData;
//   }
//   return imageDataArr;
// })(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
