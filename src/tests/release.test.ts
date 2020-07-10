import { ReleaseService } from '@infrastructure/services/release.service';

const isLinesEndConsistent = (notesString: string) => {
    const notes = notesString.split('\n');
    const numberOfNotes = notes.length;
    const numberOfNotesEndWithDot = notes.filter(note => note.endsWith('.')).length;
    const numberOfNotesNotEndWithDot = notes.filter(note => !note.endsWith('.')).length;

    return numberOfNotes === Math.abs(numberOfNotesEndWithDot - numberOfNotesNotEndWithDot);
};

const isNotesStartWithUpperCase = (notesString: string) => {
    const notes = notesString.split('\n');
    const numberOfNotes = notes.length;
    const numberOfNotesStartWithUpperCase = notes.filter(
        note => note[0] === note[0].toUpperCase()
    ).length;

    return numberOfNotes === numberOfNotesStartWithUpperCase;
};

const isNotesStartWithSpace = (notesString: string) => {
    const notes = notesString.split('\n');
    const numberOfNotesStartWithUpperCase = notes.filter(
        note => note[0] === ' '
    ).length;

    return numberOfNotesStartWithUpperCase > 0;
};

const isNotesHasLongSpace = (notesString: string) => {
    const notes = notesString.split('\n');
    const numberOfNotesHasLongSpaces = notes.filter(
        note => note.indexOf('  ') > 0
    ).length;

    return numberOfNotesHasLongSpaces > 0;
};

const checkReleaseFileExist = () => {
    return (
        this.releases.filter(
            (release: { title: any; RELEASE_VERSION: any; }) => release.title === release.RELEASE_VERSION
        ).length > 0
    );
};

describe('Release notes: ', () => {
    let releaseService: ReleaseService;
    let data: string;
    let dataUpperCase: string;
    let isReleaseFileExist: boolean;

    before(() => {
        releaseService = new ReleaseService();
        isReleaseFileExist = releaseService.checkReleaseFileExist();
        data = releaseService.readReleaseFile();
    });

    it('Check last version.', () => {
        expect(releaseService.RELEASE_VERSION).equal('1.0.0');
    });

    it('Release notes is exist.', () => {
        expect(isReleaseFileExist).equal(true);
    });

    it('Read most recent release notesnot equal null.', () => {
        if (isReleaseFileExist) {
            dataUpperCase = data.toUpperCase();
            expect(data).not.equal(null);
        }
    });

    it('Read most recent release notes not undefined.', () => {
        if (isReleaseFileExist) {
            dataUpperCase = data.toUpperCase();
            expect(data).not.equal(undefined);
        }
    });

    it('Read most recent release notes not empty.', () => {
        if (isReleaseFileExist) {
            dataUpperCase = data.toUpperCase();
            expect(data).not.equal('');
        }
    });

    it('Notes lines either end or not end with dot.', () => {
        if (!!data) {
            expect(isLinesEndConsistent(data)).equal(true);
        }
    });

    it('Notes lines start with upper case.', () => {
        if (!!data) {
            expect(isNotesStartWithUpperCase(data)).equal(true);
        }
    });

    it('Notes lines not start with space.', () => {
        if (!!data) {
            const isStartWithSpace = isNotesStartWithSpace(data);
            expect(isStartWithSpace).equal(false);
        }
    });

    it('Notes lines has not long space.', () => {
        if (!!data) {
            const hasLongSpace = isNotesHasLongSpace(data);
            expect(hasLongSpace).equal(false);
        }
    });

    describe('(Android Platform)', () => {
        it('Less than 500 characters.', () => {
            if (!!data) {
                expect(data.length).lessThan(501);
            }
        });

        it('Not Include APPLE keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('APPLE');
            }
        });

        it('Not Include IOS keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('IOS');
            }
        });
    });

    describe('(IOS Platform)', () => {
        it('Not Include Android keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('ANDROID');
            }
        });

        it('Not Include GOOGLE keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('GOOGLE');
            }
        });

        it('Not Include Amazon keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('AMAZON');
            }
        });

        it('Not Include Blackberry keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('BLACKBERRY');
            }
        });

        it('Not Include Windows keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('WINDOWS');
            }
        });

        it('Not Include ALPHA keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('ALPHA');
            }
        });

        it('Not Include BETA or TESTING keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('BETA');
            }
        });

        it('Not Include TESTING keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('TESTING');
            }
        });

        it('Not Include coming soon keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('COMING SOON');
            }
        });

        it('Not Include coming shortly keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('COMING SHORTLY');
            }
        });

        it('Not Include with the next release keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('WITH THE NEXT RELEASE');
            }
        });

        it('Not Include arriving soon keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contain('ARRIVING SOON');
            }
        });

        it('Not Include Lorem Ipsum keyword.', () => {
            if (!!data) {
                expect(dataUpperCase).not.contains('LOREM IPSUM');
            }
        });
    });
});
