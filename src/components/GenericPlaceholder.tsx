import { ReactNode } from 'react'
import styled from 'styled-components'

import { Typography, Button, ButtonVariant } from '~/components/designSystem'
import { theme } from '~/styles'

export interface GenericPlaceholderProps {
  className?: string
  title: string
  subtitle: string
  image: ReactNode
  buttonTitle: string
  buttonVariant?: ButtonVariant
  noMargins?: boolean
  buttonAction: () => unknown
}

interface GenericPlaceholderNoButtonProps
  extends Omit<GenericPlaceholderProps, 'buttonTitle' | 'buttonAction' | 'buttonVariant'> {
  buttonTitle?: never
  buttonAction?: never
  buttonVariant?: never
}

export const GenericPlaceholder = ({
  className,
  title,
  subtitle,
  image,
  buttonTitle,
  noMargins = false,
  buttonVariant,
  buttonAction,
}: GenericPlaceholderProps | GenericPlaceholderNoButtonProps) => (
  <Container className={className} $noMargins={noMargins}>
    {image}
    <Title variant="headline">{title}</Title>
    <Body $withButton={!!buttonTitle && !!buttonAction}>{subtitle}</Body>

    {!!buttonTitle && !!buttonAction && (
      <Button variant={buttonVariant} size="large" onClick={buttonAction}>
        {buttonTitle}
      </Button>
    )}
  </Container>
)

const Container = styled.div<{ $noMargins?: boolean }>`
  margin: ${({ $noMargins }) => ($noMargins ? 0 : '0 auto')};
  padding: ${({ $noMargins }) =>
    $noMargins ? 0 : `${theme.spacing(20)} ${theme.spacing(4)} ${theme.spacing(4)}`};
  max-width: 496px;

  img {
    width: 40px;
    height: 40px;
  }

  > *:first-child {
    margin-bottom: ${theme.spacing(8)};
  }
`

const Title = styled(Typography)`
  && {
    margin-bottom: ${theme.spacing(3)};
  }
`

const Body = styled(Typography)<{ $withButton?: boolean }>`
  && {
    margin-bottom: ${({ $withButton }) => ($withButton ? theme.spacing(8) : 0)};
  }
`