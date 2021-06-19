import { SessionStorageService } from 'ngx-webstorage';
import { UserDetailModel } from './user-detail.model';
export class BaseComponent {
  data = new Map();
  userDetail: UserDetailModel = JSON.parse(this.session.retrieve('userInfo')) || new UserDetailModel();
  activeModules: number[] = JSON.parse(this.session.retrieve('activatedModules') || '[]');
  constructor(protected session: SessionStorageService) {}
  hasRole(role: string): boolean {
    return this.userDetail.roles.includes(role);
  }
  activatedModule(module: any): boolean {
    return this.activeModules.includes(module);
  }
}
