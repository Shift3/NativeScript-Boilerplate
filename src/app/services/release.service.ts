import { Injectable } from "@angular/core";
const releaseVersion: string = "1.2.6"; //ToDo: read this version from app.version.ts

const releases: {title: string,description: string,details: string } [] = [
   {
        title: "1.2.5",
        description: "This is release V 1.2.5",
        details: `Fixed free row get one badge only
Fixed free row interval base type
Fixed issue with undefined stroke HR
Fixed format of integer values
Fixed delay switching between metrics
Fixed crashes on long workouts and improve performance
Fixed HIIT training getting badges`
    },
    {
        title: "1.2.6",
        description: "This is release V 1.2.6",
        details: `Free row now only awards 1 workout badge
Free row now supports displaying time or distance in the UI based on current interval type
Fixed malformed error when uploading to Concept2 Logbook
Fixed delay when switching between workout metrics
Fixed crashes on long workouts and improve performance
Fixed data issues when reporting to Concept2 Logbook
Added support for Heart Rate on Concept2 Logbook and fixed other heart rate issues
Fixed issue with HIIT not awarding badge when target was beaten
Conditioning Program now shows target in workout screen for weeks 2-6
Row Forge now sends verified workouts to Concept2 Logbook
Improved keyboard behavior on iOS forms
Fixed screen sometimes falling asleep on subsequent workouts
Fixed an issue with second workout doesn't load.
Fixed an issue with time format.
Fixed an issue with shared badges give wrong name.`
    },
]

@Injectable({
    providedIn: "root"
})
export class ReleaseService {
    constructor() {

    }

    checkReleaseFileExist(): boolean {
        return releases.filter(release => release.title === releaseVersion).length > 0;
    }

    readReleaseFile(): string {
        return releases.filter(release => release.title === releaseVersion)[0].details;
    }

    isLinesEndConsistent(notesString:string) {
        const notes = notesString.split("\n");
        const numberOfNotes = notes.length;
        const numberOfNotesEndWithDot = notes.filter(note => note.endsWith(".")).length;
        const numberOfNotesNotEndWithDot = notes.filter(note => !note.endsWith(".")).length;

        return numberOfNotes === Math.abs(numberOfNotesEndWithDot - numberOfNotesNotEndWithDot);
    }

    isNotesStartWithUpperCase(notesString:string) {
        const notes = notesString.split("\n");
        const numberOfNotes = notes.length;
        const numberOfNotesStartWithUpperCase = notes.filter(note => note[0] === note[0].toUpperCase()).length;

        return numberOfNotes === numberOfNotesStartWithUpperCase;
    }

    isNotesStartWithSpace(notesString:string) {
        const notes = notesString.split("\n");
        const numberOfNotesStartWithUpperCase = notes.filter(note => note[0] === " ").length;

        return numberOfNotesStartWithUpperCase > 0;
    }

    isNotesHasLongSpace(notesString:string) {
        const notes = notesString.split("\n");
        const numberOfNotesHasLongSpaces = notes.filter(note => note.indexOf("  ") > 0).length;

        return numberOfNotesHasLongSpaces > 0;
    }
}
