import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GuiColumn, GuiRowSelection, GuiRowSelectionType, GuiSelectedRow } from '@generic-ui/ngx-grid';
import { OpsDataService, QueryParams } from '../services/ops-data-service';
import * as XLSX from 'xlsx';

export interface TableViewOptions {
  title: string,
  queryParams: QueryParams
}

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrl: './view-table.component.scss'
})
export class ViewTableComponent implements OnInit {
  @Input() viewOptions!: TableViewOptions;
  tableData: any[] = [];
  columns: GuiColumn[] = [];
  loading: boolean = true;

  rowSelection: boolean | GuiRowSelection = {
    enabled: true,
    type: GuiRowSelectionType.ROW
  };

  constructor(private opsDataService: OpsDataService) {
  }

  ngOnInit(): void {
    this.opsDataService.getViewTable(this.viewOptions.queryParams).subscribe((result: any) => {
      this.columns = result.columns;
      this.tableData = result.data;
      this.loading = false;
    });
  }

  onSelectedRows(rows: Array<GuiSelectedRow>): void {
    if (rows && rows.length) {
      const ssid = rows[0].source.salesSiteId;
      // this.chooseSsid.emit(ssid);
    }
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.viewOptions.title}.xlsx`);
  }
}

