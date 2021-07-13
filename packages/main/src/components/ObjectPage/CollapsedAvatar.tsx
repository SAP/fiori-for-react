import { StyleClassHelper } from '@ui5/webcomponents-react-base/dist/StyleClassHelper';
import { AvatarSize } from '@ui5/webcomponents-react/dist/AvatarSize';
import React, { CSSProperties, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

const styles = {
  base: {
    alignSelf: 'center',
    opacity: 0
  },
  hidden: {
    opacity: 0
  },
  visible: {
    transition: 'opacity 0.5s',
    opacity: 1
  },
  imageContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
    maxHeight: '3rem',
    width: '3rem',
    maxWidth: '3rem'
  },
  image: {
    width: '100%',
    height: '100%'
  }
};

const useStyles = createUseStyles(styles, {
  name: 'CollapsedAvatar'
});

export interface CollapsedAvatarPropTypes {
  image?: string | ReactElement;
  imageShapeCircle?: boolean;
  style?: CSSProperties;
}

export const CollapsedAvatar = (props: CollapsedAvatarPropTypes) => {
  const { image, imageShapeCircle, style } = props;
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const domRef = useRef();

  const avatarContent = useMemo(() => {
    if (!image) return null;

    if (typeof image === 'string') {
      return (
        <span
          className={classes.imageContainer}
          style={{ borderRadius: imageShapeCircle ? '50%' : 0, overflow: 'hidden' }}
        >
          <img className={classes.image} src={image} alt="Object Page Image" />
        </span>
      );
    } else {
      return React.cloneElement(image, {
        size: AvatarSize.S,
        // @ts-ignore
        className: image.props?.className
          ? `${classes.imageContainer} ${image.props?.className}`
          : classes.imageContainer
      } as unknown);
    }
  }, [image, imageShapeCircle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerClasses = StyleClassHelper.of(classes.base);
  if (isMounted) {
    containerClasses.put(classes.visible);
  } else {
    containerClasses.put(classes.hidden);
  }

  return (
    <div ref={domRef} className={containerClasses.valueOf()} style={style}>
      {avatarContent}
    </div>
  );
};
