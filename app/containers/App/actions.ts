import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { Repo } from '../RepoListItem/types';

export const loadRepos = () => action(ActionTypes.LOAD_REPOS);
export const reposLoaded = (repos: Repo[], username: string) =>
  action(ActionTypes.LOAD_REPOS_SUCCESS, { repos: repos, username: username });
export const repoLoadingError = (error: object) =>
  action(ActionTypes.LOAD_REPOS_ERROR, error);

export const getWithExpiry = (key) => {
  const itemStr: any = localStorage.getItem(key)
  if (!itemStr) {
    return false
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return false
  }
  return item.value
}  
