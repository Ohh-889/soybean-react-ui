import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, Button, Card } from 'soybean-react-ui';

const AlertDialogPage = () => {
  return (
    <Card title="AlertDialog">
      <div className="flex-c gap-4">
        <Card
          split
          title="Destructive"
        >
          <AlertDialog
            title="Are you sure delete?"
            type="destructive"
            footer={[
              <AlertDialogCancel key="cancel">Cancel</AlertDialogCancel>,
              <AlertDialogAction key="action">Confirm</AlertDialogAction>
            ]}
            trigger={
              <Button
                color="destructive"
                variant="outline"
              >
                Show Dialog
              </Button>
            }
          >
            <p>This action will delete all data</p>
          </AlertDialog>
        </Card>

        <Card
          split
          title="Success"
        >
          <AlertDialog
            footer={<AlertDialogAction key="action">Confirm</AlertDialogAction>}
            title="Congratulations"
            type="success"
            trigger={
              <Button
                color="success"
                variant="outline"
              >
                Show Dialog
              </Button>
            }
          >
            <p>You have successfully completed the task</p>
          </AlertDialog>
        </Card>

        <Card
          split
          title="Warning"
        >
          <AlertDialog
            title="Warning"
            type="warning"
            footer={[
              <AlertDialogCancel key="cancel">Cancel</AlertDialogCancel>,
              <AlertDialogAction key="action">Confirm</AlertDialogAction>
            ]}
            trigger={
              <Button
                color="warning"
                variant="outline"
              >
                Show Dialog
              </Button>
            }
          >
            <p>Be careful with this action</p>
          </AlertDialog>
        </Card>

        <Card
          split
          title="Information"
        >
          <AlertDialog
            footer={<AlertDialogAction key="action">Confirm</AlertDialogAction>}
            title="Information"
            type="info"
            trigger={
              <Button
                color="info"
                variant="outline"
              >
                Show Dialog
              </Button>
            }
          >
            <p>Here is some information for you</p>
          </AlertDialog>
        </Card>
      </div>
    </Card>
  );
};

export default AlertDialogPage;
