import React, { useState, useEffect } from "react";
import {
  SwipeViewsContainer,
  SwipeHeaderView,
  SwipeViewsTabs,
  SwipeViewsTabList,
  SwipeViewsTab,
  SwipeViewsInk,
  SwipeViewsContent,
  SwipeView,
} from "./SwipeView.styled";

function SwipeViews(props) {
  const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex || 0);
  const [pageWidthPerCent, setPageWidthPerCent] = useState(100 / React.Children.count(props.children));
  const [translation, setTranslation] = useState(selectedIndex * pageWidthPerCent);
  const [clientX, setClientX] = useState(null);
  const [animate, setAnimate] = useState(true);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  useEffect(() => {
    _selectIndex();
  }, []);

  useEffect(() => {
    _selectIndex(parseInt(props.selectedIndex, 10));
  }, [props.selectedIndex]);

  function _selectIndex(selectedIndex) {
    if (Number.isInteger(selectedIndex)) {
      const translation = selectedIndex * pageWidthPerCent;
      setSelectedIndex(selectedIndex);
      setTranslation(translation);
      setClientX(null);
      setAnimate(true);
    }
    if (!props.router) {
      return null;
    }
    React.Children.map(props.children, (child, index) => {
      const to = child.props.title.props.to;
      const isActive = props.router.isActive(to);
      if (isActive) {
        const translation = index * pageWidthPerCent;
        setSelectedIndex(index);
        setTranslation(translation);
        setClientX(null);
        setAnimate(true);
      }
    });
  }

  function _transitionTo(selectedIndex) {
    if (props.onIndexChange) {
      props.onIndexChange(selectedIndex);
    }
    if (!props.router) {
      return null;
    }
    const child = React.Children.map(props.children, (child) => child)[selectedIndex];
    const to = child.props.title.props.to;
    if (!props.router.isActive(to)) {
      props.router.transitionTo(to);
    }
  }
  function _handleClick(selectedIndex, event) {
    const newTranslation = selectedIndex * pageWidthPerCent;
    setSelectedIndex(selectedIndex);
    setTranslation(newTranslation);
    setClientX(null);
    setAnimate(true);
    if (event.target.localName === "li") {
      _transitionTo(selectedIndex);
    }
  }

  function _handleScroll() {
    const newTranslation = selectedIndex * pageWidthPerCent;
    setSelectedIndex(selectedIndex);
    setTranslation(newTranslation);
    setClientX(null);
    setAnimate(true);
  }

  return (
    <SwipeViewsContainer>
      <SwipeHeaderView>
        <SwipeViewsTabs>
          <SwipeViewsTabList>
            {React.Children.map(props.children, (child, index) => {
              const className = index === selectedIndex ? "active" : "";
              return (
                <SwipeViewsTab key={index} className={className} isActive={index === selectedIndex} onClick={_handleClick.bind(this, index)}>
                  {child.props.title}
                </SwipeViewsTab>
              );
            })}
          </SwipeViewsTabList>
          <SwipeViewsInk pageWidthPerCent={pageWidthPerCent} translations={translation} animate={animate} />
        </SwipeViewsTabs>
      </SwipeHeaderView>
      <SwipeViewsContent translation={translation} totalWidth={React.Children.count(props.children) * 100} animate={animate}>
        {React.Children.map(props.children, (child, index) => {
          const isSelected = index === selectedIndex;
          return (
            <SwipeView
              key={index}
              style={{
                width: pageWidthPerCent + "%",
                display: isSelected ? "block" : "none", // 선택된 페이지만 표시
              }}
              onScroll={_handleScroll}
            >
              {child.props.children}
            </SwipeView>
          );
        })}
      </SwipeViewsContent>
    </SwipeViewsContainer>
  );
}

export default SwipeViews;
