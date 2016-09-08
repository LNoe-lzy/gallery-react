require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom'

// 获取图片相关的数据
let imageData = require('../data/imageData.json');

// 利用自执行函数, 将图片名信息转化为url路径信息
imageData = ((imageDataArr) => {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageUrl = require('../images/' + singleImageData.filename);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageData);

class ImgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageUrl}
             alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">
            {this.props.data.title}
          </h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {
  constructor (props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      // 水平方向的取值范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      // 垂直方向的取值范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: [
        {
          // pos: {
          //   left: '0',
          //   top: '0'
          // }
        }
      ]
    }
  }

  /*
   * 重新排布所有图片
   * @param centerIndex 指定剧中排布那个图片
   */
  rearrange (centerIndex) {

  }

  // 组建加载以后为每张图片计算其位置范围
  componentDidMount () {
    // 取得舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    // 取得一个imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigures0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 计算左侧、右侧图片排布的位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgW;
    this.Constant.hPosRange.y[1] = stageH - halfImgW;

    // 计算上侧区域图片拍部位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);

  }

  render() {

    let controllerUnits = [],
      imgFigures = [];
    imageData.forEach((value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index} />);
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
