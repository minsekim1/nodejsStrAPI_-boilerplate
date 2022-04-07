import { atomFamily } from 'recoil';
import { UserProps } from '../../types';
import useCustomQuery from './useCustomQuery';
import { gql, useMutation } from '@apollo/client';
import { SERVER_URL } from '..';
import { API_URL, API_URL_Image } from '../../api/config';

//#region getUserIdQuery
const geyMyId = gql`
  query {
    me {
      id
    }
  }
`;
const getUserIdQuery = (): UserIdProps => {
  const data = useCustomQuery(geyMyId);
  return { ...data, data: { id: data.data ? data.data.me.id : null } };
};
type UserIdProps = {
  data: {
    id: string | null; //'1'
  };
  loading: boolean;
  refetch: () => void;
};
//#endregion

//#region getUserDataQuery
const getMy = (user_id: string) => gql`
  query {
    usersPermissionsUser(id: ${user_id}) {
      data {
        id
        attributes {
          username
          email
          confirmed
          blocked
          nickname
          profile_image {
            data {
              attributes {
                url
              }
            }
          }
          greeting
          device_token
          device_type
          agree_push
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const getUserDataQuery = (): UserDataQueryProps => {
  const { data: userId } = getUserIdQuery();
  const { data, loading, refetch } = useCustomQuery(getMy(userId.id ?? '0'));
  const d = data ? data.usersPermissionsUser.data : null;
  const resData = d //data
    ? {
        id: d.id,
        agree_push: d.attributes.agree_push,
        blocked: d.attributes.blocked,
        confirmed: d.attributes.confirmed,
        createdAt: d.attributes.createdAt,
        device_token: d.attributes.device_token,
        device_type: d.attributes.device_type,
        email: d.attributes.email,
        greeting: d.attributes.greeting,
        nickname: d.attributes.nickname,
        profile_image: ImageQueryData(d.attributes.profile_image),
        updatedAt: d.attributes.agree_push,
      }
    : null;
  return { loading, refetch, data: resData };
};
const ImageQueryData = (data: any): string | null => {
  try {
    return API_URL_Image + data.data.attributes.url;
  } catch (e) {
    return null;
  }
};
export type UserDataQueryProps = {
  data: {
    id: UserProps['user']['id'];
    agree_push: UserProps['user']['agree_push'];
    blocked: UserProps['user']['blocked'];
    confirmed: UserProps['user']['confirmed'];
    createdAt: UserProps['user']['createdAt'];
    device_token: UserProps['user']['device_token'];
    device_type: UserProps['user']['device_type'];
    email: UserProps['user']['email'];
    greeting: UserProps['user']['greeting'];
    nickname: UserProps['user']['nickname'];
    profile_image: string | null;
    updatedAt: any;
  } | null;
  loading: boolean;
  refetch: () => void;
};
export type UserDataNotNullQueryProps = {
  id: UserProps['user']['id'];
  agree_push: UserProps['user']['agree_push'];
  blocked: UserProps['user']['blocked'];
  confirmed: UserProps['user']['confirmed'];
  createdAt: UserProps['user']['createdAt'];
  device_token: UserProps['user']['device_token'];
  device_type: UserProps['user']['device_type'];
  email: UserProps['user']['email'];
  greeting: UserProps['user']['greeting'];
  nickname: UserProps['user']['nickname'];
  profile_image: string | null;
  updatedAt: any;
};
//#endregion
