import { Component, OnInit } from '@angular/core';
import { DataEntryService } from 'src/app/service/data-entry.service';

@Component({
  selector: 'app-preiew-mode',
  templateUrl: './preiew-mode.component.html',
  styleUrls: ['./preiew-mode.component.css']
})
export class PreiewModeComponent implements OnInit {
  previewFormData: any = {};
  
  constructor(
    private dataEntryService: DataEntryService
  ) { }

  ngOnInit(): void {
    this.previewFormData = this.dataEntryService.getData()
  }

  ConfirmData() {
    
  }
  
  editData() {
    
  }
}
