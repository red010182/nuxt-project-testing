export interface Permission {
  code: string;
  label: string;
  children: Permission[];
  check: boolean;
}

export type Permissions = Permission[];

export enum  CheckStatus{
  none = 0,
  part,
  all
}
export interface PermissionNode {
  permission: Permission;
  checkStatus: CheckStatus;
}