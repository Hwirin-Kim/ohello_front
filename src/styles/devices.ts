const breakpoints = {
  small: "650px",
  medium: "768px",
  large: "1024px",
  xlarge: "1300px",
};
/**
 * sm 650px 이상
 * md 768px 이상
 * large 1024px 이상
 * xlg 1300px 이상
 */
export const devices = {
  sm: `(min-width: ${breakpoints.small})`,
  md: `(min-width: ${breakpoints.medium})`,
  lg: `(min-width: ${breakpoints.large})`,
  xlg: `(min-width: ${breakpoints.xlarge})`,
};
