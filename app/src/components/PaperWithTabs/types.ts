import { PaperProps as PaperPrefabProps } from '@material-ui/core';

export interface PaperWithTabsProps extends PaperPrefabProps {
  title?: string;
  tabs: { label: string; Panel: JSX.Element }[];
}
