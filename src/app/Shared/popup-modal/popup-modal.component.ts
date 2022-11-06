import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {

  
  @Input() public modalTitle: string
  @ViewChild('modal') private modalContent: TemplateRef<PopupModalComponent>
  private modalRef: NgbModalRef

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open() {
    this.modalRef = this.modalService.open(this.modalContent, { size: 'lg'})
    this.modalRef.result.then()
  }

  close() {
    this.modalRef.close()
  }

  dismiss() {
    this.modalRef.dismiss()
  }

}
