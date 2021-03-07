import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { LoanModel } from 'src/app/models/loan.model';
import { ClientLoansService } from 'src/app/services/client-loans.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss'],
})
export class RejectedComponent implements OnInit {

  public rowData: any;
  public columnDefs;
  public autoGroupColumnDef;
  public defaultColDef;
  public rowGroupPanelShow;
  public groupHeaderHeight;
  public headerHeight;
  public floatingFiltersHeight;
  public pivotGroupHeaderHeight;
  public pivotHeaderHeight;
  public multiSortKey;
  public rowSelection;
  public pivotPanelShow;
  public gridApi;
  public gridColumnApi;
  public sideBar;
  public frameworkComponents;
  loans: LoanModel[];

  constructor(
    public clService: ClientLoansService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    public modalController: ModalController,

  ) {

    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'firstname',
        sortable: true,
        filter: true,
        cellClass: 'upp',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 220,
      },
      {
        headerName: 'Lastname',
        field: 'lastname',
        width: 220,
      },
      {
        headerName: 'NRC Number',
        field: 'nrc'
      },
      {
        headerName: 'Phone Number',
        field: 'phoneNumber',
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 120,
        cellClass: 'upp',
      },
      {
        headerName: 'Principal Amount (ZMW)',
        field: 'principalAmount',
      },
      {
        headerName: 'Interest Rate (%)',
        field: 'interestRate',
      },
      {
        headerName: 'Interest Amount (ZMW)',
        field: 'interestAmount',
        width: 120,
      },
      {
        headerName: 'Total Amount (ZMW)',
        field: 'total',
      },

      {
        headerName: 'Status',
        field: 'status',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Approved By Firstname',
        field: 'approvedByFirstname',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Approved By Lastname',
        field: 'approvedByLastname',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Date Created',
        field: 'date',
        type: 'date',
        width: 250,
      },
    ];

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
    };

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: false,
      filter: true,
    };
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.rowSelection = 'multiple';
    this.multiSortKey = 'ctrl';
    this.groupHeaderHeight = 75;
    this.headerHeight = 48;
    this.floatingFiltersHeight = 50;
    this.pivotGroupHeaderHeight = 50;
    this.pivotHeaderHeight = 100;
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }


  async onSelectionChanged(ev: any) {
    // const actionSheet = await this.actionSheetController.create({
    //   header: 'Manage agent information',
    //   cssClass: 'my-custom-class',
    //   buttons: [

    //     {
    //       text: ev.data.accountStatus == 'Enabled' ? 'Disable' : 'Enable',
    //       icon: ev.data.accountStatus == 'Enabled' ? 'lock-closed' : 'lock-open',
    //       handler: () => {
    //         // this.clService.enableAccount(ev.data);
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       icon: 'close',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }]
    // });
    // await actionSheet.present();
  }


  autoSizeAll(skipHeader: any) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var defaultSortModel = [
      {
        colId: 'firstname',
        sort: 'asc',
      },
    ];
    params.api.setSortModel(defaultSortModel);

    this.clService.selectAllDisabled().subscribe(loans => {
      this.loans = loans;
    });
  }

  ngOnInit() { }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
