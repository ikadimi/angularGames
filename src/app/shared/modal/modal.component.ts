import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnDestroy {
  public isOpen: boolean = false;
  private subscription!: Subscription;

  constructor(private modalService: ModalService) {
    this.subscription = this.modalService.isOpenSubject.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onOpen(): void {
  //   this.modalService.open();
  // }
  // onClose(): void {
  //   this.modalService.close();
  // }
}
