import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { JhiDataUtils, JhiDateUtils, JhiParseLinks } from 'ng-jhipster';

@NgModule({
  providers: [
    DatePipe,
    JhiDataUtils,
    JhiDateUtils,
    JhiParseLinks,
    {
      provide: NgbModal,
      useValue: null,
    },
    {
      provide: SessionStorageService,
      useValue: null,
    },
    {
      provide: LocalStorageService,
      useValue: null,
    },
  ],
  imports: [HttpClientTestingModule],
})
export class HomejetAngularTestModule {}
