import React, { Component } from "react";
import BScroll from "better-scroll";
import _ from "lodash";
import "./index.module.scss";

export default class Scroller extends Component {
  componentDidMount() {
    this.startInit();
  }

  startInit = () => {
    const {
      getScroller,
      scroll = {}, //作为覆盖默认配置项传入，
      ...rest
    } = this.props;

    const { forceRefresh } = scroll || {};

    this.scroll = new BScroll(`.${this.uuid}`, {
      click: true,
      probeType: 3,
      preventDefault: !!scroll.y,
      stopPropagation: true,
      scrollbar: scroll.y
        ? {
            fade: false,
            interactive: true
          }
        : false,
      scrollY: !!scroll.y,
      scrollX: true,
      bounce: {
        top: true,
        bottom: true,
        left: false,
        right: false
      },
      mouseWheel: !!scroll.y,
      ...scroll,
      ...rest,
      preventDefaultException: {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
        className: /(^|\s)td(\s|$)/
      }
    });
    if (forceRefresh && this.scroll && this.scroll.refresh) {
      this.scroll.on("scroll", () => {
        this.scroll.refresh();
      });
      window.onresize = () => {
        this.scroll.refresh();
      };
    }
    if (getScroller) {
      getScroller(this.scroll);
    }
  };

  render() {
    this.uuid = _.uniqueId("container_");
    const { children, scroll = {} } = this.props;
    const wrapStyle = {
      position: "relative",
      width: "100%",
      height: scroll.y ? scroll.y : "100%"
    };
    const innerStyle = {
      height: "100%",
      width: "100%",
      ...(scroll.y ? { overflow: "hidden" } : {}),
      position: "absolute",
      top: 0,
      left: 0
    };
    return (
      <div style={wrapStyle}>
        <div className={`${this.uuid}`} style={innerStyle}>
          <div style={{ minWidth: scroll.x }}>{children}</div>
        </div>
      </div>
    );
  }
}
