enum Status{
    READY,
    IN_PROGRESS,
    DONE
}

interface User{
    id: number;
    name: String;
}

interface Attach{
    ids: number[];
}

interface Task {
    description: String;
    title: String;
    status: Status;
}
