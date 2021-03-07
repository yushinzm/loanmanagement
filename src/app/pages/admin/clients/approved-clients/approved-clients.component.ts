import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-approved-clients',
  templateUrl: './approved-clients.component.html',
  styleUrls: ['./approved-clients.component.scss'],
})
export class ApprovedClientsComponent implements OnInit {

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
  clients: UserModel[];

  constructor(
    public cService: ClientsService,
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
        headerName: 'Gender',
        field: 'gender',
        width: 120,
        cellClass: 'upp',
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
        headerName: 'Maximum Loan Amount',
        field: 'loanAmount',
      },
      {
        headerName: 'Interest Rate (%)',
        field: 'interestRate',
      },
      {
        headerName: 'Loans #',
        field: 'loanCount',
      },
      {
        headerName: 'Active',
        field: 'activeDisplay',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Account Status',
        field: 'accoutStatus',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Role',
        field: 'role',
        width: 150,
        cellClass: "upp",
      },
      {
        headerName: 'Last Sign',
        field: 'lastSignInTime',
        width: 250,
      },
      {
        headerName: 'Date Created',
        field: 'dateCreated',
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
    const actionSheet = await this.actionSheetController.create({
      header: 'Manage agent information',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: ev.data.accoutStatus == 'enabled' ? 'Disable' : 'Enable',
          icon: ev.data.accoutStatus == 'enabled' ? 'lock-closed' : 'lock-open',
          handler: () => {
            this.cService.disableAccount(ev.data);
            // this.presentModal(ev.data);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
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

    this.cService.selectAllConfirmed().subscribe(clients => {
      this.clients = clients;
    });
  }

  ngOnInit() {
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}
