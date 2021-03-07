import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-pending-agents',
  templateUrl: './pending-agents.component.html',
  styleUrls: ['./pending-agents.component.scss'],
})
export class PendingAgentsComponent implements OnInit {

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
  agents: UserModel[];

  constructor(
    public aService: AgentsService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
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
        headerName: 'Active',
        field: 'activeDisplay',
        width: 150,
      },
      {
        headerName: 'Account Status',
        field: 'accoutStatus',
        width: 150,
      },
      {
        headerName: 'Role',
        field: 'role',
        width: 150,
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
          text: ev.data.accountStatus == 'Enabled' ? 'Disable' : 'Enable',
          icon: ev.data.accountStatus == 'Enabled' ? 'lock-closed' : 'lock-open',
          handler: () => {
            if (ev.data.accountStatus == 'Enabled') {
              //   this.aService.disableAccount(ev.data);
            } else {
                this.aService.enableAccount(ev.data);
            }
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


  //   async presentAlertRadio(agentData: any) {
  //     var rolesSub = this.rService.roleItem.subscribe(async (r) => {
  //       rolesSub.unsubscribe();

  //       if (r.length < 1) {
  //         return this.presentToast('Please add a role before you can assign an agent a role!')
  //       }
  //       var roles = [];

  //       for (let index = 0; index < r.length; index++) {
  //         const element = r[index];
  //         var data = {
  //           name: 'radio' + index,
  //           type: 'radio',
  //           value: index,
  //           label: element.roleName,
  //           checked: false,
  //         }
  //         if (element.approved && element.status === "Enabled") {
  //           roles.push(data);
  //         }
  //       }

  //       if (roles.length < 1) {
  //         return this.presentToast('Please add a role before you can assign an agent a role!')
  //       }
  //       const alert = await this.alertController.create({
  //         cssClass: 'my-custom-class',
  //         header: 'Choose a role',
  //         inputs: roles,
  //         buttons: [
  //           {
  //             text: 'Cancel',
  //             role: 'cancel',
  //             cssClass: 'secondary',
  //             handler: () => {
  //               console.log('Confirm Cancel');
  //             }
  //           }, {
  //             text: 'Done',
  //             handler: async (v) => {

  //               if (v.length < 1) {
  //                 return;
  //               }
  //               var rs: any;
  //               rs = r[v];
  //               var roleName = rs.roleName;
  //               var roleUID = rs.uid;
  //               var paths = [];

  //               for (let index = 0; index < rs.sections.length; index++) {
  //                 const element = rs.sections[index];
  //                 paths.push(element.path);
  //               }
  //               this.aService.updateAccountRole(agentData, roleName, roleUID, paths, rs.sections);
  //             }
  //           }
  //         ]
  //       });
  //       await alert.present();
  //     });
  //   }

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

    this.aService.selectAllPending().subscribe(agents => {
      this.agents = agents;
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
