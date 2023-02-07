import { GetServerSidePropsResult, NextPageContext } from 'next';
import { getAccessToken } from './accessToken';
import { validateAuthorization } from './verifyAccessToken';

type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsResult<{}>>;

const wonderwallRedirect = {
  redirect: {
    destination: '/oauth2/login?redirect=/', //TODO Hvor skal den redirectes?
    permanent: false,
  },
};

export function beskyttetSide(handler: PageHandler) {
  return async function withBearerTokenHandler(context: NextPageContext): Promise<ReturnType<typeof handler>> {
    if (process.env.NODE_ENV === 'development') {
      return handler(context);
    }

    const bearerToken = getAccessToken(context);

    if (!bearerToken) {
      return wonderwallRedirect;
    }

    try {
      await validateAuthorization(bearerToken);
    } catch (e) {
      return wonderwallRedirect;
    }
    return handler(context);
  };
}

export const beskyttetSideUtenProps = beskyttetSide(async (): Promise<GetServerSidePropsResult<{}>> => {
  return {
    props: {},
  };
});
