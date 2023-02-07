import { BodyShort, GuidePanel, LinkPanel } from '@navikt/ds-react';
import { LandingPageAnimation } from '@/components/LandingPageAnimation/LandingPageAnimation';
import { beskyttetSideUtenProps } from '../auth/beskyttetSide';

export default function Home() {
  return (
    <LandingPageAnimation>
      <GuidePanel>
        <div className={'guide-panel-content'}>
          <h2>Hva ønsker du å gjøre?</h2>
          <LinkPanel border={true} href="/sok">
            <LinkPanel.Title>
              <BodyShort>Gjør et kafka-søk</BodyShort>
            </LinkPanel.Title>
          </LinkPanel>
        </div>
      </GuidePanel>
    </LandingPageAnimation>
  );
}

export const getServerSideProps = beskyttetSideUtenProps;
