import { CssSizeVariables } from '@ui5/webcomponents-react-base/dist/CssSizeVariables';
import { ThemingParameters } from '@ui5/webcomponents-react-base/dist/ThemingParameters';
import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { createUseStyles } from 'react-jss';

export interface FormGroupProps {
  /**
   * Heading of the FormGroup.
   */
  heading: string;
  /**
   * Contents of the FormGroup. Please use only `FormItem` to keep the intended design.
   */
  children: ReactNode | ReactNodeArray;
}

const useStyles = createUseStyles(
  {
    title: {
      gridColumn: 'span 12',
      display: 'flex',
      alignItems: 'center',
      height: CssSizeVariables.sapWcrFormGroupTitleHeight,
      lineHeight: CssSizeVariables.sapWcrFormGroupTitleHeight,
      fontFamily: ThemingParameters.sapFontFamily,
      color: ThemingParameters.sapTextColor,
      fontSize: ThemingParameters.sapFontSize,
      fontWeight: 'bold',
      backgroundColor: ThemingParameters.sapGroup_TitleBackground,
      margin: 0,
      paddingTop: '1rem'
    },
    spacer: { height: '1rem', gridColumn: 'span 12' }
  },
  { name: 'FormGroup' }
);
/**
 * The `FormGroup` encapsulates `FormItems` into groups.
 * __Note:__ `FormGroup` is only used for calculating the final layout of the `Form`, thus it doesn't accept any other props than `heading` and `children`, especially no `className`, `style` or `ref`.
 */
const FormGroup: FC<FormGroupProps> = (props: FormGroupProps) => {
  const { heading, children } = props;

  const classes = useStyles();

  return (
    <>
      <h6 className={classes.title} title={heading} aria-label={heading}>
        {heading}
      </h6>
      {children}
      <span className={classes.spacer} />
    </>
  );
};

FormGroup.displayName = 'FormGroup';

export { FormGroup };
