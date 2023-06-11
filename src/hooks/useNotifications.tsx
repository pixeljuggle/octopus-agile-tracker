import { Status } from 'components/Status';
import { ReactElement } from 'react';
import toast from 'react-hot-toast';

type ToastTemplatePropTypes = {
  title?: string;
  body?: string;
  icon?: ReactElement | null;
  onClick?: () => void;
};

const ToastTemplate = ({ title = '', body = '', icon = null, onClick = () => null }: ToastTemplatePropTypes): ReactElement => {
  return (
    <div className="flex flex-row flex-nowrap content-center items-center justify-start py-2 pl-2 pr-1">
      {icon ? <div className="mr-3">{icon}</div> : null}
      <span className="">
        {title ? <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{title}</p> : null}
        {body ? <p className="text-sx text-neutral-700 dark:text-neutral-300">{body}</p> : null}
      </span>
      <button
        className="ml-5 flex h-6 w-6 flex-row flex-nowrap content-center items-center justify-center rounded px-2 text-sm text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
        onClick={onClick}
      >
        &#10006;
      </button>
    </div>
  );
};

export type NotificationContentType = {
  title?: string;
  body?: string;
};
export const useNotifications = () => {
  const classNames = 'rounded shadow-md border border-neutral-150 bg-neutral-0 dark:bg-neutral-900 dark:border-neutral-800 p-0';
  const notify = {
    error: (content: NotificationContentType = { title: '', body: '' }, duration = 5000) => {
      toast((t) => <ToastTemplate title={content?.title} body={content?.body} onClick={() => toast.dismiss(t.id)} icon={<Status status={3} />} />, {
        duration: duration,
        className: classNames,
      });
    },
    warning: (content: NotificationContentType = { title: '', body: '' }, duration = 5000) => {
      toast((t) => <ToastTemplate title={content?.title} body={content?.body} onClick={() => toast.dismiss(t.id)} icon={<Status status={2} />} />, {
        duration: duration,
        className: classNames,
      });
    },
    success: (content: NotificationContentType = { title: '', body: '' }, duration = 5000) => {
      toast((t) => <ToastTemplate title={content?.title} body={content?.body} onClick={() => toast.dismiss(t.id)} icon={<Status status={1} />} />, {
        duration: duration,
        className: classNames,
      });
    },
  };

  return notify;
};
