import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReleaseService {
    RELEASE_VERSION = '1.0.0'; // ToDo: read this version from app.version.ts
    releases: { title: string; description: string; details: string }[] = [
        {
            title: '1.0.0',
            description: 'This is release V 1.0.0',
            details: 'This is the first Release.'
        }
    ];

    checkReleaseFileExist(): boolean {
        return (
            this.releases.filter(release => release.title === this.RELEASE_VERSION)
                .length > 0
        );
    }

    readReleaseFile(): string {
        return this.releases.filter(release => release.title === this.RELEASE_VERSION)[0]
            .details;
    }
}
