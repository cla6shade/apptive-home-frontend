import styled from '@emotion/styled';
import { FontWeight, TextProps } from '@/types/atoms';

function Text({ children, weight, responsiveSize, as = 'p', ...rest }: TextProps) {
  const cssWeight = convertWeightToCss(weight);
  return (
    <ResponsiveText as={as} weight={cssWeight} responsiveSize={responsiveSize || {}} {...rest}>
      {children}
    </ResponsiveText>
  );
}

const ResponsiveText = styled.p<TextProps>`
  font-weight: ${(props: TextProps) => props.weight};
  font-size: ${(props: TextProps) => props.defaultSize};
  ${(props: TextProps) =>
    props.responsiveSize && Object.entries(props.responsiveSize).map(([breakpoint, value]) => `
      @media (min-width: ${breakpoint}) {
        font-size: ${value};
      }
  `).join('')}
`;

function convertWeightToCss(weight?: FontWeight) {
  if (!weight) {
    return 400; // default to regular
  }
  switch (weight) {
    case 'medium':
      return 500;
    case 'bold':
      return 700;
    case 'regular':
      return 400;
    case 'lighter':
      return 300;
    case 'bolder':
      return 800;
    default:
      return weight;
  }
}

export default Text;
